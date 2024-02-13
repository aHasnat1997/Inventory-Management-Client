import DashboardBarChart from "@/components/BarChart/DashboardBarChart";

export default function Dashboard() {
  const sellData = [
    {
      title: 'Total Revenue',
      amount: '$ 45,231.89'
    },
    {
      title: 'Subscriptions',
      amount: '+2350'
    },
    {
      title: 'Sales',
      amount: '+12,234'
    },
    {
      title: 'Active Now',
      amount: '+573'
    },
  ];
  return (
    <section>
      <div className="py-12 grid grid-cols-4 border-b-2 border-gray-400 divide-x-2 divide-gray-400">
        {
          sellData.map((data, i) => <div
            key={i}
            className="pl-10"
          >
            <h4 className="text-2xl italic">{data.title}</h4>
            <h2 className="text-6xl font-bold">{data.amount}</h2>
          </div>)
        }
      </div>
      <div className="mt-16">
        <DashboardBarChart />
      </div>
    </section>
  )
}
