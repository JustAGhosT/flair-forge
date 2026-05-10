import { describe, expect, it } from 'vitest'
import Header from '../../../frontend/src/components/Header/Header'
import { render, screen } from '../../../frontend/src/test/utils'
import styles from '../../../frontend/src/components/Header/Header.module.css'

describe('Header Component', () => {
  it('renders the logo', () => {
    render(<Header />)
    const logo = screen.getByAltText(/flairforge logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/templates/i)).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })

  it('has correct navigation structure', () => {
    render(<Header />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3) // 3 nav links
  })

  it('applies correct CSS classes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass(styles.header)
  })
})
