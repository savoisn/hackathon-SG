create table project (
  id serial not null primary key,
  
  name text not null,
  
  totalspent integer ,
  
  expenses text ,
  
  users text ,
  
  open boolean ,
  
  finalizing boolean 
  
);
