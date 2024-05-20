import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { useBarChart } from 'entities/dashboard/bar-chart'
import { usePieChart } from 'entities/dashboard/pie-chart'
import { usePostsChart } from 'entities/dashboard/posts-chart'
import { FC } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useMediaQuery } from 'react-responsive'
import { PostCard } from 'shared/ui/post-card'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export const DashboardCharts: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px )' })
  const { pie } = usePieChart()
  const { bar } = useBarChart()
  const { postsData } = usePostsChart()

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
          height: 100,
          background: '#fafafa',
          padding: '1rem',
          marginBottom: 20,
          borderRadius: 8,
          overflow: 'auto',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        {postsData.map((item) => (
          <PostCard key={item.value} value={item.value} name={item.label} />
        ))}
      </div>
    </>
  )
}
