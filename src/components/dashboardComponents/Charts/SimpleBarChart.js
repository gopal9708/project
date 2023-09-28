import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const data = [
  { name: 'Jan', pv: 2400, uv: 2400 },
  { name: 'Feb', pv: 1398, uv: 2210 },
  { name: 'Mar', pv: 9800, uv: 2290 },
  { name: 'Apr', pv: 3908, uv: 2000 },
  { name: 'May', pv: 4800, uv: 2181 },
  { name: 'Jun', pv: 3800, uv: 2500 },
  { name: 'Jul', pv: 4300, uv: 2100 },
  { name: 'Aug', pv: 5300, uv: 2300 },
  { name: 'Sep', pv: 3200, uv: 1800 },
  { name: 'Oct', pv: 2800, uv: 1600 },
  { name: 'Nov', pv: 1890, uv: 1800 },
  { name: 'Dec', pv: 2390, uv: 2500 },
];

const MyBarChart = () => {
  return (
    <div style={{ width: '100%', maxWidth: '790px', margin: '0 auto' }}>
  <div style={{ paddingBottom: '6.25%', position: 'relative' }}> 
      <BarChart width={790} height={250} data={data} responsive>
        
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8E9775" />
        <Bar dataKey="uv" fill="#558776" />
      </BarChart>
    </div>
     </div>
  );
};

export default MyBarChart;

