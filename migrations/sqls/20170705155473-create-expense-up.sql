create table expense (
  id serial not null primary key,
  
  name text not null,
  
  date timestamp with time zone not null,
  
  amount integer not null,
  
  payer text ,
  
  recipients text ,
  
  settled boolean 
  
);
