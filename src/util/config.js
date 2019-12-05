// export const fileOptions = [{
//   label: '受控',
//   value: 'CONTROLLED'
// },
// {
//   label: '编制中',
//   value: 'WRITING'
// },
// {
//   label: '审批中',
//   value: 'REVIEWING'
// },
// {
//   label: '批准中',
//   value: 'APPROVING'
// }]
export const fileOptions = [
  {
    label: '受控且生效',
    value: 'CONTROLLED'
  },
  {
    label: '受控未生效',
    value: 'WRITING'
  },
  {
    label: '审批中',
    value: 'REVIEWING'
  }
]
export const doControlFileOptions = [
  { label: '受控', value: 'CONTROLLED' },
  { label: '编制中', value: 'WRITING' }
]
export const defaultFolderId = 0
