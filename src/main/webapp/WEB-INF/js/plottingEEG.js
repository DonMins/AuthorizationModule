function plotEEG() {
    // Morris.Line({
    //     //Контейнер для вывода графика
    //     element: 'myfirstchart',
    //     //Данные для графика
    //     data: [
    //         {time: '1', y: "F7", value: 10},
    //         {time: '2', y: "F4", value: 35},
    //         {time: '3', y: "F8", value: 10},
    //         {time: '4', y: "T3", value: 11},
    //         {time: '5', y: "C3", value: 45},
    //         {time: '6', y: "Cz", value: 25},
    //         {time: '7', y: "C4", value: 24},
    //         {time: '8', y: "T4", value: 10}
    //     ],
    //     //Массив занчений для оси X
    //     xkey: 'time',
    //     parseTime: false,
    //
    //
    //
    //     //Префикс в конце для оси Y
    //     postUnits: '',
    //
    //     //Коридор цены за 1 доллар
    //     // goals: [45.0, 27.0],
    //     goalStrokeWidth: 2,
    //     goalLineColors: ['#d9534f'],
    //
    //     //Событийные линии по оси X
    //     // events: ['2014-01-01', '2015-10-01'],
    //     eventStrokeWidth: 2,
    //     eventLineColors: ['#428bca'],
    //
    //     //Цвет линий
    //     lineColors: ['#5cb85c', '#f0ad4e'],
    //     //Выводимые линии
    //     ykeys: ['value'],
    //     //Названия линий
    //     // labels: ['Нефть', 'Рубль'],
    //     pointSize: 0,
    //     hideHover: 'always'
    // });
    var data =  [
        [
            0.257135,
            0.353833,
            0.372726,
            0.215045,
            -0.085169,
            -0.217192,
            -0.236050,
            -0.205985,
            -0.100981,
            0.010924 ,
            0.080193,
            0.108991,
            0.145441,
            0.195406,
            0.223409,
            0.189005,
            0.048140,
            -0.121078,
            -0.196168,
            -0.220563,
            -0.224201,
            -0.231030,
            -0.265877
        ],
        [
            0.141753 +2,
            0.257629+2,
            0.333135+2,
            0.303980+2,
            0.072379+2,
            -0.132535+2,
            -0.237868+2,
            -0.267374+2,
            -0.198074+2,
            -0.096482+2,
            0.000000+2,
            0.084909+2,
            0.147284+2,
            0.209403+2,
            0.279672+2,
            0.352285+2,
            0.332228+2,
            0.093437+2,
            -0.106658+2,
            -0.214003+2,
            -0.270745+2,
            -0.313804+2,
            -0.374376+2,
        ]
    ];

    return new Chartist.Line('#myfirstchart', {
        labels: [1, 2, 3],
        series: data
    }, {
        low: 0,
        high: 1.5,
        showPoint: false,
        fullWidth: true,
        axisY: {
            labelInterpolationFnc: function (value) {
                debugger;
                if (value === data[0][0]) {
                    return "T1";
                } else if (value === data[1][0]) {
                    return "T2"
                }
            },
            type: Chartist.FixedScaleAxis,
            ticks: [data[0][0], data[1][0]],
        },
    });
}