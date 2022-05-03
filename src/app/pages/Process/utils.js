const dummyProcessData = []

for (let i = 0; i <= 10; i += 1) {
  dummyProcessData.push({
    id: i,
    data: `dummy-${i}`,
    progress: Math.floor(Math.random() * 101),
  })
}

export const getAllProcess = () => {
  return dummyProcessData;
}
