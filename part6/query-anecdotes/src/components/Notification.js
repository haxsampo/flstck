import { useNotifValue } from '../NotifContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notific = useNotifValue()

  return (
    <div style={style}>
      {notific}
    </div>
  )
}

export default Notification
