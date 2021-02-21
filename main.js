$(function () {
  var s = skrollr.init();

  var apiurl = {
    newLaborPensionFundByMonth:
      'data/newLaborPensionFundByMonth_202102_update.json',
    newLaborPensionFundByYear:
      'data/newLaborPensionFundByYear_2021_update.json',
    laborPensionFundInvestmentStockType:
      'data/laborPensionFundInvestmentStockType_202102_update.json',
  };

  $.ajax({
    url: apiurl.newLaborPensionFundByMonth,
    success: function (res) {
      var labels = [];
      var dataset1 = [];
      var dataset2 = [];

      for (var i = 0; i < res.length; i++) {
        var month = res[i].月別;
        var rateOfInvestment = res[i].收益率;
        var rateOfGuarantee = res[i].保證收益率;

        labels.push(month);
        dataset1.push(rateOfInvestment);
        dataset2.push(rateOfGuarantee);

        // 繪製表格
        $('#tableForNewByMonth').append(
          '<tr><th>' +
            month +
            '</th><td>' +
            rateOfInvestment +
            '</td><td>' +
            rateOfGuarantee +
            '</td></tr>'
        );
      }

      // 繪製折線圖
      var ctx = $('#chartForNewByMonth');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '收益率',
              data: dataset1,
              borderColor: '#1769ff',
              fill: false,
            },
            {
              label: '保證收益率',
              data: dataset2,
              borderColor: '#70b29c',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      s.refresh();
    },
  });

  $.ajax({
    url: apiurl.newLaborPensionFundByYear,
    success: function (res) {
      var labels = [];
      var dataset1 = [];
      var dataset2 = [];

      for (var i = 0; i < res.length; i++) {
        var year = res[i].年度;
        var rateOfInvestment = res[i].收益率;
        var rateOfGuarantee = res[i].保證收益率;

        labels.push(year);
        dataset1.push(rateOfInvestment);
        dataset2.push(rateOfGuarantee);

        // 繪製表格
        $('#tableForNewByYear').append(
          '<tr><th>' +
            year +
            '</th><td>' +
            rateOfInvestment +
            '</td><td>' +
            rateOfGuarantee +
            '</td></tr>'
        );
      }

      // 繪製折線圖
      var ctx = $('#chartForNewByYear');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '收益率',
              data: dataset1,
              borderColor: '#1769ff',
              fill: false,
            },
            {
              label: '保證收益率',
              data: dataset2,
              borderColor: '#70b29c',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      s.refresh();
    },
  });

  $.ajax({
    url: apiurl.laborPensionFundInvestmentStockType,
    success: function (res) {
      var labels = [];
      var dataset1 = [];
      var dataset2 = [];

      res.sort(function (a, b) {
        return Number(b.新制勞工退休基金) > Number(a.新制勞工退休基金) ? 1 : -1;
      });

      for (var i = 0; i < res.length; i++) {
        var type = res[i].投資類別;
        var newLaborFund = Number(res[i].新制勞工退休基金);
        var oldLaborFund = Number(res[i].舊制勞工退休基金);
        labels.push(type);
        dataset1.push(newLaborFund);
        dataset2.push(oldLaborFund);
      }

      var ctx = $('#chartForStockType');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '投資比例',
              data: dataset1,
              borderColor: '#1769ff',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });

      s.refresh();
    },
  });

  // var apiurl = {
  //   newLaborPensionFundByMonth: "https://apiservice.mol.gov.tw/OdService/rest/datastore/A17030000J-000040-wwu",
  //   newLaborPensionFundByYear: "https://apiservice.mol.gov.tw/OdService/rest/datastore/A17000000J-030177-n17",
  //   laborPensionFundInvestmentStockType: "https://apiservice.mol.gov.tw/OdService/rest/datastore/A17030000J-000036-xzj"
  // };

  // $.ajax({
  //   url: apiurl.newLaborPensionFundByMonth,
  //   success: function (res) {
  //     var responseData = res.result.records;
  //     var labels = [];
  //     var dataset1 = [];
  //     var dataset2 = [];

  //     for (var i = 0; i < responseData.length; i++) {
  //       var month = responseData[i].月別;
  //       var rateOfInvestment = responseData[i].收益率;
  //       var rateOfGuarantee = responseData[i].保證收益率;

  //       labels.push(month);
  //       dataset1.push(rateOfInvestment);
  //       dataset2.push(rateOfGuarantee);

  //       // 繪製表格
  //       $("#tableForNewByMonth").append(
  //         "<tr><th>" +
  //         month +
  //         "</th><td>" +
  //         rateOfInvestment +
  //         "</td><td>" +
  //         rateOfGuarantee +
  //         "</td></tr>"
  //       );
  //     }

  //     // 繪製折線圖
  //     var ctx = $("#chartForNewByMonth");
  //     var chart = new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: "收益率",
  //           data: dataset1,
  //           borderColor: "#1769ff",
  //           fill: false
  //         }, {
  //           label: "保證收益率",
  //           data: dataset2,
  //           borderColor: "#70b29c",
  //           fill: false
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //       }
  //     })
  //   }
  // });

  // $.ajax({
  //   url: apiurl.newLaborPensionFundByYear,
  //   success: function (res) {
  //     var responseData = res.result.records;
  //     var labels = [];
  //     var dataset1 = [];
  //     var dataset2 = [];

  //     for (var i = 0; i < responseData.length; i++) {
  //       var year = responseData[i].年度;
  //       var rateOfInvestment = responseData[i].收益率;
  //       var rateOfGuarantee = responseData[i].保證收益率;

  //       labels.push(year);
  //       dataset1.push(rateOfInvestment);
  //       dataset2.push(rateOfGuarantee);

  //       // 繪製表格
  //       $("#tableForNewByYear").append(
  //         "<tr><th>" +
  //         year +
  //         "</th><td>" +
  //         rateOfInvestment +
  //         "</td><td>" +
  //         rateOfGuarantee +
  //         "</td></tr>"
  //       );
  //     }

  //     // 繪製折線圖
  //     var ctx = $("#chartForNewByYear");
  //     var chart = new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: "收益率",
  //           data: dataset1,
  //           borderColor: "#1769ff",
  //           fill: false
  //         }, {
  //           label: "保證收益率",
  //           data: dataset2,
  //           borderColor: "#70b29c",
  //           fill: false
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //       }
  //     })
  //   }
  // });

  // $.ajax({
  //   url: apiurl.laborPensionFundInvestmentStockType,
  //   success: function (res) {
  //     var responseData = res.result.records;
  //     var labels = [];
  //     var dataset1 = [];
  //     var dataset2 = [];

  //     responseData.sort(function (a, b) {
  //       return Number(b.新制勞工退休基金) > Number(a.新制勞工退休基金) ? 1 : -1
  //     })

  //     for (var i = 0; i < responseData.length; i++) {
  //       var type = responseData[i].投資類別;
  //       var newLaborFund = Number(responseData[i].新制勞工退休基金);
  //       var oldLaborFund = Number(responseData[i].舊制勞工退休基金);
  //       labels.push(type);
  //       dataset1.push(newLaborFund);
  //       dataset2.push(oldLaborFund);
  //     }

  //     var ctx = $("#chartForStockType");
  //     var chart = new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: "投資比例",
  //           data: dataset1,
  //           borderColor: "#1769ff",
  //           fill: false
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //       }
  //     })
  //   }
  // });

  $(document).on('click', 'a', function (event) {
    // event.preventDefault();
    var target = $(this).attr('href');
    $('html,body').animate(
      {
        scrollTop: $(target).offset().top,
      },
      500
    );
  });
});
