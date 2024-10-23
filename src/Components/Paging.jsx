import { useEffect, useState } from "react"
import axios from 'axios'


function Paging() {

    const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1)


  const getData = async () => {
    const res = await axios.get('https://66fb96148583ac93b40c4df3.mockapi.io/aarti/users')
    setMembers(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const change = (currentpage) => {
     //console.log(currentpage,page)
    if(currentpage>=1 && currentpage!== page && currentpage <=10)
    setPage(currentpage)
  }


  return (
    <div>
      {
        members.slice(page * 10 -10 ,page * 10).map((items) => {
          const { id,  } = items
          return (
            <h4 key={id} >{id}.{title}</h4>
          )
        })
      }
      <section style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <button onClick={() => { change(page - 1) }}>Prev</button>


       {[...Array(data.length/10)].map((_,i)=>{
        return(<button key={i } onClick={()=>{change(i+1)}} style={{background: i+1 === page ? 'green' : ''}}> {i+1}</button>

        )
       })}


        <button onClick={() => { change(page + 1) }}>Next</button>
      </section>

    </div>


  )
}
export default Paging