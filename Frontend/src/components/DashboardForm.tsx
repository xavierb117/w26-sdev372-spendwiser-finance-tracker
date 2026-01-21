import { useEffect, useState } from "react";

const Categories = [
    { id: "surplus", label: "Surplus"},
    { id: "keyboards", label: "Keyboards"},
    { id: "gym", label: "Gym"},
];

type Expense = {
  id: number;
  hobby: string;
  description: string | null;
  location: string | null;
  amount: number;
  expense_date: string;
  created_at: string;
};

export default function DashboardForm(){
    const [category, setCategory] =useState("");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [expenses, setExpenses] = useState<Expense[]>([]);

    async function submitExpense() {
        if (!category || !amount || !date) return;

        await fetch("http://localhost:3001/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hobby: category,
                description,
                location,
                amount,
                expense_date: date,
            }),
    });

    fetchExpenses();

    setCategory("");
    setAmount("");
    setDate("");
    setDescription("");
  }

  async function fetchExpenses() {
    const res = await fetch("http://localhost:3001/expenses");
    const data = await res.json();
    setExpenses(data);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

    {/*Top dashboard*/}
    return(
    <div className="dashboard">

        <div className="top-row">
            <div className="field">
                <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select</option>
                {Categories.map((cat) =>(
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}  
            </select>
         </div> 

        <div className="field">
            <label>$ Spent</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="field">
            <label>Location</label>
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>

        <div className="field">
            <label>Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>
    </div>

    {/*Main content*/}
    <div className="main-row">
        
        {/*Left side content history*/}
    <div className="history">
        <h3>Finance History</h3>
        {expenses.map((e) => (
          <div key={e.id} className="history-item">
            <div>{e.hobby}</div>
            <div>${e.amount}</div>
            <small>{e.expense_date}</small>
          </div>
        ))}
    </div>

      {/* Center content */}
      <div className="center">
        <div className="image-drop">Drop Product Image or Receipt here</div>

        <textarea
          placeholder="What's the item for today?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

    <button onClick={submitExpense}>Add Expense</button>

    <div/>

     {/* Right chart */}
      <div className="chart">
        <h3>Finance goals chart</h3>
        <div className="chart-placeholder"></div>
      </div>

    </div>

    <footer className="footer">Footer</footer>

    </div>
  </div>
    )
}