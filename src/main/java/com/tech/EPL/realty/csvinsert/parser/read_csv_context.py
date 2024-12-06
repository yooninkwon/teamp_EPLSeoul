import csv
import os


input_directory = 'C:\\team Albamon\EPL_Seoul 자료' 
output_directory = 'C:\\team Albamon\EPL_Seoul 자료'  


for filename in os.listdir(input_directory):
    if filename.endswith('.csv'):  
        input_file_path = os.path.join(input_directory, filename)
        

        output_filename = filename.replace('.csv', '_py.csv')
        output_file_path = os.path.join(output_directory, output_filename)
        

        with open(input_file_path, 'r', encoding='utf-8') as infile, open(output_file_path, 'w', encoding='utf-8', newline='') as outfile:
            reader = csv.reader(infile)
            writer = csv.writer(outfile, quoting=csv.QUOTE_ALL) 
            for row in reader:
                writer.writerow(row)

        print(f"처리 완료: {input_file_path} -> {output_file_path}")


