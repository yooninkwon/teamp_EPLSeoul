document.addEventListener('DOMContentLoaded', function() {
	let allData = []; // 전체 데이터를 저장
	let chartInstance = null; // Chart.js 인스턴스 저장

	// 데이터 초기 로드
	fetch("/epl/mobility/data/abdDatas")
	    .then(response => response.json())
	    .then(data => {
	        allData = data;
			makeYearBtns(); // 연도 버튼 동적으로 생성
    });

	// 자전거 교통사고 정보 호출
	document.getElementById('fetchBikeAccData').addEventListener('click', function () {
		document.getElementById('bikeAccFilter').style.display = "block";
	});
	
	// 연도 버튼 생성 함수
    function makeYearBtns() {
        const years = [...new Set(allData.map(data => data.year))].sort((a, b) => b - a); // 연도 목록 추출 및 내림차순 정렬

        // 옵션 추가
        document.getElementById('yearlySelect').innerHTML = '';
        years.forEach((year) => {
			const btn = document.createElement('button');
	        btn.textContent = year;
			btn.dataset.year = year;
	        btn.className = 'option-item';
			
			btn.addEventListener('click', () => {
	            btn.classList.toggle('active');
                updateChart(); // 차트 업데이트
	        });
			
            document.getElementById('yearlySelect').appendChild(btn);
        });
    }

	// 차트 생성 함수
	function updateChart() {
		// 기존 인스턴스 삭제
		if (chartInstance) chartInstance.destroy();
		
		// 선택된 연도 버튼 가져오기
        const selectedYears = Array.from(document.querySelectorAll('#yearlySelect .active'))
            .map(btn => btn.dataset.year);
        if (selectedYears.length === 0) return; // 선택된 연도가 없으면 차트 생성 중단
		
		// 선택된 연도로 데이터 필터링
        const filteredData = allData.filter(data => selectedYears.includes(data.year));
		
		// 데이터 분리
        const districts = [...new Set(filteredData.map(data => data.district))];
        const datasets = generateDatasets(filteredData, districts);
		
	    const ctx = document.getElementById('chart').getContext("2d");
		// 차트 생성
		chartInstance = new Chart(ctx, {
            type: 'bar', // 기본 타입은 bar
            data: {
                labels: districts,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true }, // X축 스택 적용
                    y: { stacked: true }  // Y축 스택 적용
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: { usePointStyle: true }
                    },
                    tooltip: { enabled: true }
                }
            }
        });
	}
	
	// 데이터셋 생성 함수
    function generateDatasets(filteredData, districts) {
        const types = ['피해운전자', '가해운전자'];
        const datasets = [];

		// type에 따라 데이터셋 그룹화
		types.forEach(type => {
	        // 발생건수(Line Chart)
	        datasets.push({
	            label: `${type} - 발생건수`,
	            data: districts.map(district => {
	                return filteredData
	                    .filter(data => data.district === district && data.type.includes(type) && data.item.includes('발생건수'))
	                    .reduce((sum, data) => sum + data.cnt, 0);
	            }),
	            type: 'line',
	            backgroundColor: 'transparent',
	            borderColor: type === '피해운전자' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
	            borderWidth: 2,
	            fill: false
	        });

	        // 부상자수(Stacked Bar)
	        datasets.push({
	            label: `${type} - 부상자수`,
	            data: districts.map(district => {
	                return filteredData
	                    .filter(data => data.district === district && data.type.includes(type) && data.item.includes('부상자수'))
	                    .reduce((sum, data) => sum + data.cnt, 0);
	            }),
	            type: 'bar',
	            backgroundColor: 'rgba(75, 192, 192, 0.6)',
	            stack: type
	        });

	        // 사망자수(Stacked Bar)
	        datasets.push({
	            label: `${type} - 사망자수`,
	            data: districts.map(district => {
	                return filteredData
	                    .filter(data => data.district === district && data.type.includes(type) && data.item.includes('사망자수'))
	                    .reduce((sum, data) => sum + data.cnt, 0);
	            }),
	            type: 'bar',
	            backgroundColor: 'rgba(255, 99, 132, 0.6)',
	            stack: type
	        });
	    });

        return datasets;
    }
});