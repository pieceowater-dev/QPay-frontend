import { FC } from 'react'
import { IPostCardProps } from 'shared/ui/post-card/model/interface'

export const PostCard: FC<IPostCardProps> = ({ name, value }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '17px',
        padding: '18px 29px',
        gap: '10px',
        color: '#ffffff',
        background: 'linear-gradient(150deg, rgb(168, 234, 131) 0%, rgb(110, 189, 116) 100%)',
        minWidth: '250px',
        boxShadow: '4px 4px 8px 0 rgba(34, 60, 80, 0.2)',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: 18 }}>{name}</div>
      <div>{value}</div>
    </div>
  )
}
