// const processorProfile_x = (networksCount, dataSize) => {
//     if ((networksCount === 1 && dataSize === 'LOW') || (networksCount >= 2 && dataSize === 'MEDIUM')) {
//         return 'SMALL';
//     } else if ((networksCount === 1 && dataSize === 'MEDIUM') || (networksCount >= 2 && dataSize === 'LARGE')) {
//         return 'MEDIUM';
//     } else if (networksCount === 1 && dataSize === 'LARGE') {
//         return 'LARGE';
//     }
// };

// const apiProfile_x = (queryComplexity) => {
//     if (queryComplexity === 'SIMPLE' || queryComplexity === 'NOT_SURE') {
//         return 'SMALL';
//     } else if (queryComplexity === 'MID') {
//         return 'MEDIUM';
//     } else if (queryComplexity === 'COMPLEX') {
//         return 'LARGE';
//     }
// };

// const apiReplicas = (requestsPerSecond) => {
//     if (requestsPerSecond >= 0 && requestsPerSecond <= 1) {
//         return 1;
//     } else if (requestsPerSecond >= 2 && requestsPerSecond <= 5) {
//         return 2;
//     } else if (requestsPerSecond >= 6) {
//         return 2 + Math.round(Math.log10(requestsPerSecond));
//     }
// };

// const postgresProfile = (queryComplexity, networksCount) => {
//     if (queryComplexity === 'SIMPLE' || queryComplexity === 'NOT_SURE') {
//         return 'SMALL';
//     } else if (queryComplexity === 'MID' || (networksCount >= 2 && networksCount <= 9)) {
//         return 'MEDIUM';
//     } else if (queryComplexity === 'COMPLEX' || networksCount >= 10) {
//         return 'LARGE';
//     }
// };

// const postgresStorage = (dataSize) => {
//     if (dataSize === 'LOW') {
//         return 50;
//     } else if (dataSize === 'MEDIUM') {
//         return 150;
//     } else if (dataSize === 'LARGE') {
//         return 500;
//     }
// };

// const x = [
//     {
//         fields: ['']
//     }
// ]