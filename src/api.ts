export function getData() {
  return fetch('opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json')
    .then(response => response.json())
}
