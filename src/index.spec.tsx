import React from 'react'
import { create } from 'react-test-renderer'
import Loader from '.'

describe('Loader component', () => {
  const NAME = 'Buckwheat'
  test('Has class \'hello-world\'', () => {
    const { root } = create(<Loader name={NAME} />)
    expect(root.findByType('div').props.className).toEqual('hello-world')
  })

  test('Has name property', () => {
    const { root } = create(<Loader name={NAME} />)
    expect(root.props.name).toEqual(NAME)
  })

  test('Matches Loader innertext.', () => {
    const { root } = create(<Loader name={NAME} />)
    expect(root.findByType('div').children.join('')).toEqual('Hello Buckwheat!')
  })
})
