import data from './data.formml' with { type: 'formml' }

// will not support below
const typeNode: import('./data.formml', { with: { type: 'formml' }}).FormData = 'data'
const asyncData = import('./data.formml', { with: { type: 'formml' } })

export { data, typeNode, asyncData }
