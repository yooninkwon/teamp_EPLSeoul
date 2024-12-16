$(document).ready(function() {
	const $navLinks = $('.nav-menu a');
	const $submenuLinks = $('.submenu a');
	const currentPath = window.location.pathname;

	let $activeNavLink = null;
	let $activeSubmenuLink = null;

	$navLinks.each(function () {
	    const href = $(this).attr('href');
		console.log(href)
	    if (currentPath.startsWith(href)) {
			console.log(this)
	        $(this).addClass('active');
	        $activeNavLink = $(this);
	    }
	});

	$submenuLinks.each(function () {
	    const href = $(this).attr('href');
	    if (currentPath === href) {
	        $(this).addClass('active');
	        $activeSubmenuLink = $(this);
	    }
	});
    updateBreadcrumb($activeNavLink, $activeSubmenuLink);

	function updateBreadcrumb($activeNavLink, $activeSubmenuLink) {
	    const $breadcrumbLeft = $('.breadcrumb .left');
	    const $breadcrumbRight = $('.breadcrumb .right');
	    const pageName = $activeNavLink ? $activeNavLink.text().toUpperCase() : '';
	    const submenuPageName = $activeSubmenuLink ? $activeSubmenuLink.text().toUpperCase() : '';

	    $breadcrumbLeft.text(submenuPageName || pageName);
	    $breadcrumbRight.text(`EPL 서울 > ${pageName} > ${submenuPageName}`);
	}
});