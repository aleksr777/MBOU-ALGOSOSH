import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'
import { Direction } from '../../../types/direction'

// Тестирование отрисовки кнопки с текстом
test( 'отрисовывает кнопку с текстом', () => {
  const { container } = render( <Button text="Нажми меня" /> )
  expect( container.firstChild ).toMatchSnapshot()
} )

// Тестирование отрисовки заблокированной кнопки
test( 'отрисовывает разблокированную кнопку', () => {
  const { container } = render( <Button disabled={ true } /> )
  expect( container.firstChild ).toMatchSnapshot()
} )

// Тестирование отрисовки кнопки с индикацией загрузки
test( 'отрисовывает кнопку с индикацией загрузки', () => {
  const { container } = render( <Button isLoader /> )
  expect( container.firstChild ).toMatchSnapshot()
} )

// Тестирование отрисовки кнопки с иконкой сортировки по возрастанию
test( 'отрисовывает кнопку с иконкой сортировки по возрастанию', () => {
  const { container } = render( <Button sorting={ Direction.Ascending } /> )
  expect( container.firstChild ).toMatchSnapshot()
} )

// Тестирование отрисовки кнопки с иконкой сортировки по убыванию
test( 'отрисовывает кнопку с иконкой сортировки по убыванию', () => {
  const { container } = render( <Button sorting={ Direction.Descending } /> )
  expect( container.firstChild ).toMatchSnapshot()
} )

// Тестирование корректности вызова колбека при клике на кнопку
test( 'вызывает onClick при клике на кнопку', () => {
  const onClick = jest.fn()
  const { getByText } = render( <Button text="Нажми меня" onClick={ onClick } /> )
  fireEvent.click( getByText( 'Нажми меня' ) )
  expect( onClick ).toHaveBeenCalledTimes( 1 )
} )
