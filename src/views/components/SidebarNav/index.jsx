import { Children } from "react"
import './styles.css'

export default function SidebarNav ({title, children, className}){

  return (
    <nav className={className}>
      <p className="sidebar__label">{title}</p>
      <ul className="sidebar__list">
          {Children.map(children, (child, index) => ( <li key={index}>{child}</li> ))}
      </ul>
    </nav>
  )
}