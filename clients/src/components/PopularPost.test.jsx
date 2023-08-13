import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PopularPost from './PopularPost'

describe('App', () => {
  it('Vite to be in documen', () => {
    render(<PopularPost />)
    expect(screen.getByText('Vite')).toBeInTheDocument()
  })
})