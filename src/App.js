import React, { useState, useMemo, Fragment } from "react"

function App() {
    const [trans, setTrans] = useState([
        {
            id: 1,
            text: "Cash",
            amount: 500,
        },
        {
            id: 2,
            text: "Book",
            amount: -50,
        },
        {
            id: 3,
            text: "Camera",
            amount: -200,
        },
    ])

    return (
        <Fragment>
            <h2>Expense Tracker</h2>

            <div className="container">
                <Balance trans={trans}></Balance>
                <History trans={trans} setTrans={setTrans}></History>
                <AddForm setTrans={setTrans}></AddForm>
            </div>
        </Fragment>
    )
}

const Balance = ({ trans }) => {
    const total = useMemo(() => {
        return trans.reduce((x, y) => x + y.amount, 0)
    }, [trans])

    const income = useMemo(() => {
        return trans.reduce((x, y) => {
            if (Number(y.amount) > 0) {
                return x + y.amount
            } else return x
        }, 0)
    }, [trans])

    const expense = useMemo(() => {
        return trans.reduce((x, y) => {
            if (Number(y.amount) < 0) {
                return x + y.amount
            } else return x
        }, 0)
    }, [trans])

    return (
        <Fragment>
            <h4>Your balance</h4>
            <h1 id="balance">${total}</h1>

            <div className="inc-exp-container">
                <div>
                    <h4>Income</h4>
                    <p id="money-plus" className="money plus">
                        +${income}
                    </p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p id="money-minus" className="money minus">
                        ${expense}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

const History = ({ trans, setTrans }) => {

    function deleteItem(id){
        setTrans( oldList => oldList.filter(x => x.id !== id))
    }   

    return (
        <Fragment>
            <h3>History</h3>
            <ul id="list" className="list">
                {trans.map((x) => (
                    <li className={x.amount > 0 ? "plus" : "minus"} key={x.id}>
                        {x.text} <span> {x.amount}</span><button className="delete-btn" onClick={() => deleteItem(x.id)}>x</button>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

const AddForm = ({ setTrans }) => {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState('')

    function onSubmit(e){
        e.preventDefault()
        const newItem = {
            id: new Date(),
            text: text,
            amount: Number(amount)
        }
        setTrans( oldList => {
            const newList = [...oldList, newItem]
            return newList
        })

    }

    return (
        <Fragment>
            <h3>Add new transaction</h3>
            <form id="form" >
                <div className="form-control">
                    <label>Text</label>
                    <input type="text" id="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label>
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                    />
                </div>
                <button className="btn" onClick={onSubmit}>Add transaction</button>
            </form>
        </Fragment>
    )
}

export default App
