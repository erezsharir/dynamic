export const COLORS = {
    Miss: '#727F93',
    Hit: '#22C55E',
    Partial: '#E2B53F',
    Default: '#D4DDEB',
    Black: '#000000',
    White: '#FFFFFF',
};

export const STATUS = {
    Miss: 'miss',
    Hit: 'hit',
    Partial: 'partial',
    Default: 'default',
};

export const INITIAL_BUTTONS = [
    [
        {
            label: '0',
            keyCodes: [48, 96],
            state: STATUS.Default
        },
        {
            label: '1',
            keyCodes: [49, 97],
            state: STATUS.Default
        },
        {
            label: '2',
            keyCodes: [50, 98],
            state: STATUS.Default
        },
        {
            label: '3',
            keyCodes: [51, 99],
            state: STATUS.Default
        },
        {
            label: '4',
            keyCodes: [52, 100],
            state: STATUS.Default
        },
        {
            label: '5',
            keyCodes: [53, 101],
            state: STATUS.Default
        },
        {
            label: '6',
            keyCodes: [54, 102],
            state: STATUS.Default
        },
        {
            label: '7',
            keyCodes: [55, 103],
            state: STATUS.Default
        },
        {
            label: '8',
            keyCodes: [56, 104],
            state: STATUS.Default
        },
        {
            label: '9',
            keyCodes: [57, 105],
            state: STATUS.Default
        }
    ],
    [
        {
            label: 'Enter',
            keyCodes: [13],
            state: STATUS.Default
        },
        {
            label: '+',
            keyCodes: [187, 107],
            state: STATUS.Default
        },
        {
            label: '-',
            keyCodes: [109, 189],
            state: STATUS.Default
        },
        {
            label: '*',
            keyCodes: [56, 106],
            state: STATUS.Default
        },
        {
            label: '/',
            keyCodes: [111, 191],
            state: STATUS.Default
        },
        {
            label: 'Delete',
            keyCodes: [8],
            state: STATUS.Default
        },
    ]
]

export const KEY_CODE_TO_VALUE_MAP = {
    "48": "0",
    "49": "1",
    "50": "2",
    "51": "3",
    "52": "4",
    "53": "5",
    "54": "6",
    "55": "7",
    "56": "*",
    "57": "9",
    "96": "0",
    "97": "1",
    "98": "2",
    "99": "3",
    "100": "4",
    "101": "5",
    "102": "6",
    "103": "7",
    "104": "8",
    "105": "9",
    "106": "*",
    "107": "+",
    "109": "-",
    "111": "/",
    "187": "+",
    "189": "-",
    "191": "/"
}