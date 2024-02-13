import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '../ui/button';
import { useState } from 'react';

const data = [
  {
    name: 'Page A',
    pv: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
  },
  {
    name: 'Page C',
    pv: 9800,
  },
  {
    name: 'Page D',
    pv: 3908,
  },
  {
    name: 'Page E',
    pv: 4800,
  },
  {
    name: 'Page F',
    pv: 3800,
  },
  {
    name: 'Page G',
    pv: 4300,
  },
];

export default function DashboardBarChart() {
  const [active, setActive] = useState('daily');
  const buttonData = [
    {
      title: 'Daily',
      value: 'daily'
    },
    {
      title: 'Weekly',
      value: 'weekly'
    },
    {
      title: 'Monthly',
      value: 'monthly'
    },
    {
      title: 'Yearly',
      value: 'yearly'
    },
  ]

  return (
    <div>
      <div className="space-x-4 text-right">
        {
          buttonData.map(data => <Button
            key={data.value}
            variant={"ghost"}
            className={`duration-200 hover:text-white ${active === data.value ? 'bg-accent text-white' : ''}`}
            onClick={() => setActive(data.value)}
          >
            {data.title}
          </Button>)
        }
      </div>
      <BarChart
        width={1500}
        height={500}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      </BarChart>
    </div>
  );
}
