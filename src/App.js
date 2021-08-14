import React, {useState, useMemo} from 'react'

function App(){
    const [trans, setTrans] = useState([
        {
            id:1,
            text: 'Cash',
            amount: 500
        },
        {
            id:2,
            text:'Book',
            amount: -50
        },
        {
            id:3,
            text:'Camera',
            amount: -200
        }
    ]);

    return(
        <div id='App'>
            <h1>Expense Tracker</h1>
            <Balance trans={trans}></Balance>
            <History trans={trans}></History>
            <AddForm onSubmit={setTrans}></AddForm>    
        </div>
        
    )
}

const Balance = ({trans}) =>{

    const total = useMemo(() =>{
        return trans.reduce( (x, y) => x + y.amount, 0 )
    },[trans])

    const income = useMemo( () =>{
        return trans.reduce( (x,y) =>{
            if(Number(y.amount) > 0){
               return x + y.amount
            }else return x
        }, 0)
    }, [trans])

    const expense = useMemo( () =>{
        return trans.reduce( (x,y) =>{
            if(Number(y.amount) < 0){
               return x + y.amount
            }else return x
        }, 0)
    }, [trans])

    return(
        <div>
            <h2>Your balance</h2>
            <h2>${total}</h2>
            <h2>Income ${income}</h2>
            <h2>Expense ${expense}</h2>
        </div>
    );
}

const History = ({trans}) => {

    return(
        <div>
            <h2>History</h2>
            <hr></hr>
            {
                trans.map( x => <div><p>{x.text}   {x.amount}</p></div>)
            }
        </div>
    )
}

const AddForm = ({onSubmit}) => {

    const form = null


    return(
        <div>
            <h2>Add new transaction</h2>
            <hr></hr>
        </div>
    )
}

export default App