import {
    Viro3DObject,
    ViroAmbientLight,
    ViroAnimations,
    ViroARScene,
    ViroARSceneNavigator,
    ViroConstants,
    ViroDirectionalLight,
    ViroMaterials,
    ViroSpotLight,
    ViroText,
} from '@viro-community/react-viro';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { COLORS, icons } from '../../constants';

const ViroSceneAR = (props: any) => {
    const data: any = props.sceneNavigator.viroAppProps;
    const { obj, diffuseTexture, scale, type, position, rotation } = data?.object;
    const [text, setText] = useState('Initializing AR...');

    // State Object
    const [positionState, setPositionState] = useState(position);
    const [rotationState, setRotationState] = useState(rotation);
    const [scaleState, setScaleState] = useState(scale);

    function onInitialized(state: any) {
        if (state === ViroConstants.TRACKING_NORMAL) {
            setText('');
        } else if (state === ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }

    // Materials Object
    ViroMaterials.createMaterials({
        materials: {
            shininess: 1,
            lightingModel: 'Blinn',
            diffuseTexture: { uri: diffuseTexture },
            // diffuseTexture,
        },
    });

    // Animations
    ViroAnimations.registerAnimations({
        rotate: {
            duration: 2500,
            properties: {
                rotateY: '+=90',
            },
        },
        moveRight: {
            duration: 2500,
            properties: {
                positionX: '+=1',
            },
        },
        moveLeft: {
            duration: 2500,
            properties: {
                positionX: '-=1',
            },
        },
    });

    // Move Object on drag
    const moveObject = (newPosition: any) => {
        setPositionState(newPosition);
    };

    // Rotate Object
    const rotateObject = (rotateState: number, rotationFactor: number) => {
        if (rotateState === 3) {
            const newRotation = [
                // set to current rotation - rotationFactor.
                rotationState[0] - rotationFactor,
                rotationState[1] - rotationFactor,
                rotationState[2] - rotationFactor,
            ];
            setRotationState(newRotation);
        }
    };

    // Scale Object
    const scaleObject = (pinchState: any, scaleFactor: any) => {
        if (pinchState === 3) {
            // update scale of obj by multiplying by scaleFactor when pinch ends.
            const currentScale = scaleState[0];
            const newScale = currentScale * scaleFactor;
            const newScaleArray = [newScale, newScale, newScale];
            setScaleState(newScaleArray);
        }
    };

    return (
        <ViroARScene physicsWorld={{ gravity: [0, -9.81, 0] }} onTrackingUpdated={onInitialized}>
            <ViroText text={text} scale={[0.5, 0.5, 0.5]} position={[0, 0, -1]} style={styles.textStyle} />
            <ViroAmbientLight color={COLORS.white} />
            {/* DirectionalLight with the direction away from the user, pointed upwards, to light up the "face" of the model */}
            <ViroDirectionalLight color="#ffffff" direction={[0, -1, -0.2]} />
            <ViroSpotLight
                innerAngle={5}
                outerAngle={90}
                direction={[0, 1, 0]}
                position={[0, -7, 0]}
                color="#ffffff"
                intensity={250}
            />
            <Viro3DObject
                // source={obj}
                source={{ uri: obj }}
                position={positionState}
                scale={scaleState}
                rotation={rotationState}
                materials={['materials']}
                type={type}
                onDrag={moveObject}
                onRotate={rotateObject}
                onPinch={scaleObject}
                animation={{ name: data?.moveControls, loop: true, run: data?.animation }}
            />
        </ViroARScene>
    );
};

/* Parent */
export default ({ route }: any) => {
    const { item } = route?.params;
    const [object] = useState(item);
    const [animation, setAnimation] = useState(false);
    const [moveControls, setMoveControls] = useState<string>('');

    return (
        <View style={styles.mainView}>
            <ViroARSceneNavigator
                autofocus={true}
                viroAppProps={{ object, animation, moveControls }}
                initialScene={{ scene: ViroSceneAR }}
                style={styles.f1}
            />

            <View style={styles.controlsView}>
                <TouchableOpacity style={[styles.textBtnControls]} onPress={() => setMoveControls('moveLeft')}>
                    <Text style={styles.labelMoveControl}> Left</Text>
                </TouchableOpacity>
                <View style={styles.rotationsModal}>
                    <Text numberOfLines={1} style={styles.nameModal}>
                        {object?.name}
                    </Text>
                    <TouchableOpacity style={[styles.textBtnControls]} onPress={() => setAnimation(!animation)}>
                        <Image
                            source={animation ? icons.pause : icons.play}
                            resizeMode="contain"
                            style={styles.iconPlay}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.textBtnControls, { marginVertical: verticalScale(5) }]}
                        onPress={() => setMoveControls('rotate')}
                    >
                        <Text style={styles.labelMoveControl}> Rotate</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.textBtnControls} onPress={() => setMoveControls('moveRight')}>
                    <Text style={styles.labelMoveControl}> Right</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    mainView: {
        flex: 1,
    },
    f1: { flex: 1 },
    textStyle: {
        fontSize: 24,
        color: COLORS.white,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    controlsView: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '15@s',
    },
    rotationsModal: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBtnControls: {
        backgroundColor: COLORS.DEFAULT_GREEN,
        padding: 10,
        fontWeight: 'bold',
        borderRadius: 50,
        color: COLORS.white,
    },
    nameModal: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: '5@vs',
        width: '200@s',
        textAlign: 'center',
    },
    iconPlay: {
        width: '30@s',
        height: '30@vs',
    },
    labelMoveControl: {
        color: COLORS.white,
    },
});
