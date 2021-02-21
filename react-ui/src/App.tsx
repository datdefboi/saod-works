import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useQueue from './useQueue';
import { count } from 'console';

class Worker {
  constructor(
    public id: number,
    public c: Client | undefined) { }
}

class Client {
  constructor(public id: number, public time: number) { }
}

function App() {
  const { push, pop, peak, count, iterator } = useQueue<Client>()

  const [id, setId] = React.useState(1)
  const [workers, setWorkers] = React.useState<Worker[]>([])
  const [time, setTime] = React.useState(3)

  function startWork(worker: Worker, client: Client) {
    console.log("Started work for ", client.id, "with ", worker.id)
    worker.c = client

    function schedule() {
      setTimeout(() => {
        if (client.time == 1) {
          console.log("Work done for ", worker.id)
          workers.find(w => w.id == worker.id)!!.c = undefined
          setWorkers([...workers])
        } else {
          client.time--
          setWorkers([...workers])
          schedule()
        }
      }, 1000)
    }
    schedule()
  }

  function tryPickupClient() {
    if (count) {
      console.log("count", count)
      console.log("picking")
      var c = peak()
      console.log("picking for", c)
      for (var w of workers) {
        if (w.c == undefined) {
          console.log("picked for ", c.time)
          pop()
          startWork(w, c)
          setWorkers([...workers])
          return
        }
      }
    }
  }

  useEffect(() => {
    tryPickupClient()
  }, [count, workers])

  function addClient() {
    push({ id: id + 1, time })
    setId(id + 1)
  }

  function addWorker() {
    setWorkers([...workers, {
      id: workers.length,
      c: undefined
    }])
  }

  return (
    <div>
      <button onClick={addClient}>new client</button>
      <button onClick={tryPickupClient}>pick</button>
      <button onClick={addWorker}>add worker</button>
      <ul className="list-container">
        {Array.from(iterator).map(v =>
          <li key={v.id}>
            {v.id}({v.time})
          </li>)}
      </ul>
      <div className="wlist">
        {workers.map(v => (
          <div key={v.id}>
            Клиент: {v.c ? (<span style={{ fontSize: 30 }}>{v.c?.id}({v.c?.time})</span>) : null}
          </div>
        ))}
      </div>
      <input onChange={(v) => setTime(+v.target.value)} value={time} type="range" min={1} max={10} />
      {time}
    </div>
  )
}

export default App;
