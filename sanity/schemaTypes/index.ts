import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { productType } from './productType'
import { orderType} from './orderType'
import { salesType } from './salesType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType,
     categoryType ,
      productType ,
       orderType,
       salesType,
      ],
}
// now after making all the shematypes we have to connect sanity client to our backend