# Elastic Search

## Tools

- [Kibana](https://www.elastic.co/downloads/past-releases/kibana-7-17-5) 
- [Elastic Search](https://www.elastic.co/downloads/past-releases/elasticsearch-7-17-5) 
- [Logstash](https://www.elastic.co/downloads/past-releases/logstash-7-17-5)
- [JDBC Driver](https://jar-download.com/artifacts/com.microsoft.sqlserver/mssql-jdbc/8.4.1.jre8/source-code)

## Run kibana
```python 
.\kibana-7.17.5-windows-x86_64\bin\kibana.bat  , At Root Directory

URL = http://localhost:5601
```

## Run Elastic Search
```python 
.\elasticsearch-7.17.5\bin\elasticsearch  , At Root Directory

URL = http://localhost:9200
```


## Run LogStash
```python 
.\logstash-7.17.5\bin\logstash -f logstash_mysql.conf  , At Root Directory
```
### Create logstash_mysql.conf File in root Folder where logstash is  placed

## logstash_mysql.conf

```python
input {
    jdbc {
        # SqlServer jdbc connection string to our database
        #  "jdbc:sqlserver://HostName\instanceName;database=DBName;user=UserName;password=Password"
        jdbc_connection_string => "jdbc:sqlserver://localhost:1433;database=DatabaseName;user=Username;password=password;encrypt=true;trustServerCertificate=true"
        # The user we want to execute our statement as
        jdbc_user => nil
        # The path to our downloaded jdbc driver
        jdbc_driver_library => "mssql-jdbc Driver Path"
        # The name of the driver class for SqlServer
        jdbc_driver_class => "com.microsoft.sqlserver.jdbc.SQLServerDriver"
       
        # Query for testing purpose
        statement => "SELECT * from TableName"
    }
}
 output {
	stdout { codec => json_lines }
	elasticsearch {
		"hosts" => "localhost:9200"
		"index" => "indexName"
		"document_type" => "data"
	}
}
```
