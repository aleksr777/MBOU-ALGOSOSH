import React, { memo } from 'react'
import styles from './circle.module.css'
import { ElementStates } from '../../../types/element-states'

export interface CircleProps {
  state?: ElementStates
  letter?: string
  head?: string | React.ReactElement | null
  index?: number
  tail?: string | React.ReactElement | null
  tailType?: 'string' | 'element'
  extraClass?: string
  isSmall?: boolean
}

const Circle: React.FC<CircleProps> = ( {
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = '',
  isSmall
} ) => {
  return (
    <div className={ `${ styles.content } ${ extraClass }` }>
      <div
        data-testid='circle-head'
        className={ `text text_type_input text_color_input mb-4 ${ styles.absolute
          } ${ styles.head } ${ styles[ typeof head === 'string' ? 'string' : 'element' ]
          }` }
      >
        { head }
      </div>
      <div
        data-testid='circle-wrapper'
        className={ `${ styles.circle }  ${ isSmall ? styles.small : '' } ${ styles[ state ]
          }` }
      >
        <p
          data-testid='circle-letter'
          className={ `text text_type_circle text_color_input ${ styles.letter }` }
        >
          { letter }
        </p>
      </div>
      <p
        data-testid='circle-index'
        className={ `text text_type_input text_color_input mt-4 ${ styles.absolute } ${ styles.index }` }
      >
        { index?.toString() }
      </p>
      <div
        data-testid='circle-tail'
        className={ `text text_type_input text_color_input mt-4 ${ styles.absolute
          } ${ index?.toString() ? styles.tail60 : styles.tail30 } ${ styles[ typeof tail === 'string' ? 'string' : 'element' ]
          }` }
      >
        { tail }
      </div>
    </div>
  )
}

export default memo( Circle )
