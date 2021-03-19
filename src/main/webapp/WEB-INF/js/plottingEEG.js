function plotEEG() {
    Ext.define('s', {
        extend: 'Ext.data.Model',
        fields: ["T", "F7", "F3", "F4", "F8", "T3", "C3", "Cz", "C4", "T5", "P3", "Pz", "P4", "T6", "O1", "O2"]
    });

    var store = Ext.create('Ext.data.JsonStore', {
        model: 's',
        itemId: 'mystore',
        proxy: {
            type: 'ajax',
            url: 'http://localhost:8000/index',
            reader: {
                type: 'json',
// root: 'data',
            },
        },
        autoLoad: true,
        listeners: {
            load: function (store, records, success) {
                console.log(records)
            }
        }
// data: [
// { 'name': 'metric one', 'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8, 'data5': 13 },
// { 'name': 'metric two', 'data1': 7, 'data2': 8, 'data3': 16, 'data4': 10, 'data5': 3 },
// { 'name': 'metric three', 'data1': 5, 'data2': 2, 'data3': 14, 'data4': 12, 'data5': 7 },
// { 'name': 'metric four', 'data1': 2, 'data2': 14, 'data3': 6, 'data4': 1, 'data5': 23 },
// { 'name': 'metric five', 'data1': 4, 'data2': 4, 'data3': 36, 'data4': 13, 'data5': 33 }
// ]
    });

    debugger;
    var mainPanel = Ext.create('Ext.chart.Chart', {
        renderTo: 'main_content',
        width: '100%',
        height: 800,
        store: store,
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['F7','F3'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Датчики',
                grid: true,
                minimum: 0,
                maximum: 80
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['T'],
                title: 'Sample Metrics'
            }
        ],
        series: [
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'F7',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'F3',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'F4',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'F8',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'T3',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'C3',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'Cz',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'C4',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'T5',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'P3',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'Pz',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'P4',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'T6',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'O1',
                showMarkers:false
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'T',
                yField: 'O2',
                showMarkers:false
            },
        ]
    });
}