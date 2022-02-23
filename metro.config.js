// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    const {
        resolver: { assetExts },
    } = await getDefaultConfig();

    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            assetExts: [
                ...assetExts,
                'obj',
                'mtl',
                'mp3',
                'JPG',
                'vrx',
                'hdr',
                'gltf',
                'glb',
                'bin',
                'arobject',
                'gif',
            ],
        },
    };
})();
