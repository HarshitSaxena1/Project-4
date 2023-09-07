import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

 export const BASE_URL="http://localhost:9000";


const App = () => {

const [data,setData]=useState(null);
const [filteredData,setFilterdData]=useState(null);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null);
const [selectedbtn,setSelectedbtn]=useState("all");
   
useEffect(()=>{
  const fetchFoodData=async ()=> {
    setLoading(true);
  try{
    const response=await fetch(BASE_URL);
  
  const json=await response.json();
  setData(json);
  setFilterdData(json);
  setLoading(false);
  } catch (error){
    setError("unable to fetch data");
  }
  }; 
  fetchFoodData(); 
},[]);

const searchFood= (e) => {
  const searchValue=e.target.value;
  console.log(searchValue);

  if(searchValue==""){
    setFilterdData(null);
  }
  const filter=data?.filter((food)=>
  food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilterdData(filter);
};

const filterFood=(type)=>{
  if (type=="all"){
  setFilterdData(data);   
setSelectedbtn("all");
return;
  }
  const filter=data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilterdData(filter);
  setSelectedbtn(type);
};
const filterbtns=[
  {

    name:"All",
    type:"all"
  },
  {

    name:"BreakFast",
    type:"breakfast"
  },
  {

    name:"Lunch",
    type:"lunch"
  }, 
  {

    name:"Dinner",
    type:"dinner"
  },
];

if (error) return <div>{error}</div>;
if (loading) return <div>loading.....</div>;


  return (
    <>
    <MainContainer>
     <TopContainer>
    <div className="logo"><img src="/logo.svg" alt="logo" /></div>
<div className="search">
<input onChange={searchFood} placeholder="Search Food" /></div>


    </TopContainer>
    <FilterContainer>
    {filterbtns.map((value)=>(
        <Button 
        isSelected={selectedbtn==value.type}
        key={value.name}
         onClick={()=>filterFood(value.type)}>
         {value.name}
         </Button>
         ))
    }  
    </FilterContainer>
    </MainContainer>
    <SearchResult data={filteredData} />
    </>
    
  );
  };

export default App;
export const MainContainer=styled.div`
max-width: 1200px;
margin: 0 auto;
`;
const TopContainer=styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;
.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px; 
  }
}
@media (0 < width < 600px){
flex-direction:column;
height:80px;
}
`;
const FilterContainer=styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding: 20px;
`;
export const Button=styled.button`
background-color: ${({isSelected})=> (isSelected ? "green":"red")};
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor:pointer;

&:hover{
  background-color:red;
}
`;


