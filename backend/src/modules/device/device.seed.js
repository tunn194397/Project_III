const DeviceSeed = [
    {
        name: 'Laptop',
        parameter: [
            {name: 'configuration', unit: ''},
            {name: 'demand', unit: ''},
            {name: 'size', unit: 'inch'},
        ],
        children: []
    },
    {
        name: 'Personal Computer',
        parameter: [
            {name: 'configuration', unit: ''},
            {name: 'demand', unit: ''},
        ],
        children: [{name: 'Office Pc'}, {name: 'Gaming PC'}, {name: 'Graphics PC'}, {name: 'Mini PC'}]},
    {
        name: 'PC Monitor',
        parameter: [
            {name: 'size', unit: 'inch'},
            {name: 'frequency', unit: 'Hz'},
            {name: 'demand', unit: ''},
            {name: 'resolution', unit: 'pixel'}
        ],
    },
    {
        name: 'PC Accessory',
        children: [
            {name: 'CPU', parameter: [{name: 'configuration', unit: ''}]},
            {name: 'Hard Storage', parameter: [{name: 'type', unit: ''}]},
            {name: 'Case', parameter: []},
            {name: 'VGA', parameter: [{name: 'configuration', unit: ''}]},
            {name: 'Cooling', parameter: [{name: 'configuration', unit: ''}]},
            {name: 'RAM', parameter: [{name: 'configuration', unit: ''}]},
            {name: 'Mainboard', parameter: [{name: 'configuration', unit: ''}]},
            {name: 'PSU', parameter: [{name: 'configuration', unit: ''}]}
        ]
    },
    {name: 'PC Device',  children: [{name: 'Gaming chair'}, {name: 'Mouse'}, {name: 'Key board'}, {name: 'Mouse Pad'}, {name: 'Web cam'}]},
    {name: 'Sound Device', children: [{name: 'Headphone'}, {name: 'Earphone'}, {name: 'Loudspeaker'}]},
]