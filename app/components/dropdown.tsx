import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: object;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select option",
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsVisible(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity 
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-row items-center justify-between"
        onPress={() => setIsVisible(true)}
      >
        <Text className="text-gray-700 flex-1">{displayText}</Text>
        <Text className="text-gray-400 ml-2">▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black bg-opacity-50 justify-center items-center"
          onPress={() => setIsVisible(false)}
        >
          <View className="bg-white rounded-lg mx-8 max-h-80 w-80">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-center">
                {placeholder}
              </Text>
            </View>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => handleSelect(item.value)}
                >
                  <Text 
                    className={`text-base ${
                      item.value === selectedValue 
                        ? 'text-amber-800 font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity
              className="p-4 bg-gray-50"
              onPress={() => setIsVisible(false)}
            >
              <Text className="text-center text-gray-600">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;