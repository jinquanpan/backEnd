import request from '@/util/request'
// 统计数据
export function homeStatistic(data) {
  return request({
    url: 'home/statistic',
    method: 'post',
    data
  })
}

