IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'AdventureWorks2022')
BEGIN  
RESTORE DATABASE AdventureWorks2022 
FROM DISK = '/var/backups/AdventureWorks2022.bak' 
WITH REPLACE 
,MOVE 'AdventureWorks2022' TO '/var/opt/mssql/data/AdventureWorks2022.mdf'
,MOVE 'AdventureWorks2022_Log' TO '/var/opt/mssql/data\AdventureWorks2022_log.ldf'


ALTER DATABASE AdventureWorks2022 SET MULTI_USER
END;
GO
