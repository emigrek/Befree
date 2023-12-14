import chunk from 'lodash.chunk';
import React, { Fragment, Ref } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

export interface HorizontalFlatListProps<ItemT>
  extends Omit<
    FlatListProps<ItemT>,
    'horizontal' | 'numColumns' | 'renderItem' | 'keyExtractor'
  > {
  numRows: number;
  renderItem: (info: { item: ItemT; row: number; col: number }) => JSX.Element;
  keyExtractor: (item: ItemT, row: number, col: number) => string;
  columnStyle?: StyleProp<ViewStyle>;
}

const HFlatList = <T extends any>(
  props: HorizontalFlatListProps<T>,
  ref: Ref<FlatList<T[]>>,
) => {
  const renderItems: ListRenderItem<T[]> = ({ item: items, index: col }) => {
    const keys = items.map((item: T, row: number) =>
      props.keyExtractor(item as T, row, col),
    );
    return (
      <View key={keys.join('-')} style={props.columnStyle}>
        {items.map((item: T, row) => (
          <Fragment key={keys[row]}>
            {props.renderItem({ item, row, col })}
          </Fragment>
        ))}
      </View>
    );
  };

  const convertedProps = {
    ...props,
    data: chunk(props.data, props.numRows),
    renderItem: renderItems,
    keyExtractor: undefined,
    horizontal: true,
  } as FlatListProps<T[]>;

  return <FlatList ref={ref} {...convertedProps} />;
};

const HFlatListOutput = React.forwardRef(HFlatList) as <T extends any>(
  props: HorizontalFlatListProps<T> & { ref?: Ref<FlatList<T[]>> },
) => JSX.Element;

export { HFlatListOutput as HFlatList };
