import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { FC } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useMediaQuery } from 'react-responsive'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export const DashboardCharts: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px )' })

  const pie = {
    labels: ['Наличные', 'Каспи'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['rgb(110, 189, 116)', 'rgba(218,18,18,0.8)'],
      },
    ],
  }
  const bar = {
    labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    datasets: [
      {
        label: 'Общая сумма',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgb(110, 189, 116)',
      },
    ],
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 20 : 0,
        }}
      >
        <div style={{ width: isMobile ? '100%' : '50%', height: isMobile ? 'fit-content' : 300 }}>
          <Pie data={pie} />
        </div>

        <div style={{ width: isMobile ? '100%' : '50%', height: isMobile ? 'fit-content' : 300 }}>
          <Bar data={bar} />
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: 100,
          background: '#fafafa',
          marginBottom: 20,
          borderRadius: 8,
          overflow: 'auto',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </>
  )
}
