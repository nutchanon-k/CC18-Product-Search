import { useEffect, useState } from 'react'


function App() {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
   
useEffect(()=>{
    const fetchData =  setTimeout( async () => {
    const resp = await fetch(`https://dummyjson.com/products/search?q=${text}`)
    const result = await resp.json()
    console.log(result.products)
    setData(result.products)
  }, 500); 
  return ()=> clearTimeout(fetchData)
},[text])
  

const hdlChange = (e) =>{
    console.log(e.target.value)
    setText(e.target.value)
}

const hdlClick = (num) =>{
  if(num === -1 && page > 1 || num === 1){setPage(prev=>prev+num)}
  else(setPage(1))
}

  return (
    <div className='p-4 flex flex-col gap-4'>
      <h1>Product Search</h1>
      <input className='border border-black w-64 ' type="text" onChange={(e)=>hdlChange(e)} />
      <div className='flex '>
        <button  className='border px-1 border-black ' onClick={()=>hdlClick(-1)}>prev</button>
        <p className='border px-2 border-black '>{page}</p>
        <button className='border px-1 border-black ' onClick={()=>hdlClick(1)}>next</button>
      </div>
      <ul className='p-4'>
        {data.map((el, index)=>(index < (page*10) && index >= (page-1)*10 ? <li className='list-disc'>{el.title} | {el.category} | {el.price}</li> : null))}
      </ul>
    </div>
  )
}


export default App
