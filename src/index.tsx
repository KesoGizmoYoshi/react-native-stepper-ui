/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState, ReactElement, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepLine?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonNextStyle?: ViewStyle;
  buttonBackStyle?: ViewStyle;
  buttonFinishStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
  nextButtonLabel?: string;
  backButtonLabel?: string;
  finishButtonLabel?: string;
}

const search = (keyName: number, myArray: number[]): boolean => {
  return myArray.some((val) => val === keyName);
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepLine,
    stepStyle,
    stepTextStyle,
    buttonNextStyle,
    buttonBackStyle,
    buttonFinishStyle,
    buttonTextStyle,
    showButton = true,
    nextButtonLabel,
    backButtonLabel,
    finishButtonLabel,
  } = props;
  const [step, setStep] = useState<number[]>([0]);

  useEffect(() => {
    setStep((prev) => {
      const newStep = prev.slice();
      if (newStep[newStep.length - 1] > active) {
        return newStep.slice(0, -1);
      }
      if (!newStep.includes(active)) {
        newStep.push(active);
      }
      return newStep;
    });
  }, [active]);

  return (
    <View style={wrapperStyle}>
      {/* {content.length >= 3 && ( */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: content.length === 2 ? 40 : 0,
        }}
      >
        {content.map((_, i) => {
          const isActive = search(i, step);
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={[
                    {
                      flex: content.length === 2 ? 0 : 1,
                      height: 1,
                      width: content.length === 2 ? 40 : 'auto',
                      backgroundColor: 'grey',
                      opacity: 1,
                      marginHorizontal: 10,
                    },
                    stepLine,
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    backgroundColor: isActive
                      ? stepStyle?.backgroundColor || 'green'
                      : '#ffffff', // Use the stepStyle background color or a default color if active, and a different color if inactive
                    opacity: isActive ? 1 : 0.3,
                  },
                  stepStyle,
                  !isActive && { backgroundColor: '#d3d3d3' }, // Override the background color for inactive steps
                ]}
              >
                {isActive ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                    &#10003;
                  </Text>
                ) : null}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      {/* )} */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {content[active]}
      </ScrollView>
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {active !== 0 && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                  marginRight: 10,
                  backgroundColor: '#a1a1a1',
                },
                buttonBackStyle,
              ]}
              onPress={() => {
                onBack();
              }}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>
                {backButtonLabel}
              </Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonNextStyle,
              ]}
              onPress={() => {
                onNext();
              }}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>
                {nextButtonLabel}
              </Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                },
                buttonFinishStyle,
              ]}
              onPress={() => onFinish()}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>
                {finishButtonLabel}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;
