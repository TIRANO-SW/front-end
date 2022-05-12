// // const ctx = document.getElementById("myChart").getContext("2d");
// const myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           "rgba(54, 162, 235, 0.2)"
//         ],
//         borderColor: [
//           "rgba(54, 162, 235, 1)"
//         ],
//         borderWidth: [1,2,3,4],
//         pointRadius: [10,20,30,40],
        
//       },
      
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });


// // 업데이트 및 추가
// function testAdd(){
//   myChart.data.datasets.push({
//     label: "# of Votes",
//     data: [11, 19, 3, 5, 2, 3],
//     backgroundColor: [
//       "rgba(0, 162, 235, 0.2)"
//     ],
//     borderColor: [
//       "rgba(0, 162, 235, 1)"
//     ],
//     borderWidth: [1,2,3,4],
//     pointRadius: [10,20,30,40], 
//   });
//   myChart.update();
// }