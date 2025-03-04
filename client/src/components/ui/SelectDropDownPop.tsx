import React from 'react';
import { Root, Trigger, Content, Portal } from '@radix-ui/react-popover';
import MenuItem from '~/components/Chat/Menus/UI/MenuItem';
import type { Option } from '~/common';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils/';

type SelectDropDownProps = {
  id?: string;
  title?: string;
  value: string | null | Option;
  disabled?: boolean;
  setValue: (value: string) => void;
  availableValues: string[] | Option[];
  emptyTitle?: boolean;
  showAbove?: boolean;
  showLabel?: boolean;
  iconSide?: 'left' | 'right';
  renderOption?: () => React.ReactNode;
  containerClassName?: string;
  currentValueClass?: string;
  optionsListClass?: string;
  optionsClass?: string;
  subContainerClassName?: string;
  className?: string;
};

function SelectDropDownPop({
  title: _title,
  value,
  availableValues,
  setValue,
  showAbove = false,
  showLabel = true,
  emptyTitle = false,
  containerClassName,
  currentValueClass,
  subContainerClassName,
  className,
}: SelectDropDownProps) {
  const localize = useLocalize();
  const transitionProps = { className: 'top-full mt-3' };
  if (showAbove) {
    transitionProps.className = 'bottom-full mb-3';
  }

  let title = _title;

  if (emptyTitle) {
    title = '';
  } else if (!title) {
    title = localize('com_ui_model');
  }

  return (
    <Root>
      <div className={cn('flex items-center justify-center gap-2 ', containerClassName ?? '')}>
        <div className={cn('relative w-full', subContainerClassName ?? '')}>
          <Trigger asChild>
            <button
              data-testid="select-dropdown-button"
              className={cn(
                'relative flex w-full cursor-default flex-col rounded-md border border-black/10 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-0 focus:ring-offset-0 dark:border-white/20 dark:bg-gray-800 sm:text-sm',
                className ?? '',
                'hover:bg-gray-50 radix-state-open:bg-gray-50 dark:hover:bg-black/10 dark:radix-state-open:bg-black/20',
              )}
            >
              {' '}
              {showLabel && (
                <label className="block text-xs text-gray-700 dark:text-gray-500 ">{title}</label>
              )}
              <span className="inline-flex w-full truncate">
                <span
                  className={cn(
                    'flex h-6 items-center gap-1 truncate text-sm text-gray-900 dark:text-white',
                    !showLabel ? 'text-xs' : '',
                    currentValueClass ?? '',
                  )}
                >
                  {/* {!showLabel && !emptyTitle && (
                    <span className="text-xs text-gray-700 dark:text-gray-500">{title}:</span>
                  )} */}
                  {typeof value !== 'string' && value ? value?.label ?? '' : value ?? ''}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4  text-gray-400"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={showAbove ? { transform: 'scaleY(-1)' } : {}}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>
          </Trigger>
          <Portal>
            <Content
              side="bottom"
              align="start"
              className="mt-2 max-h-60 min-w-full overflow-hidden overflow-y-auto rounded-lg border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {availableValues.map((option) => {
                return (
                  <MenuItem
                    key={option}
                    title={option}
                    value={option}
                    selected={!!(value && value === option)}
                    onClick={() => setValue(option)}
                  ></MenuItem>
                );
              })}
            </Content>
          </Portal>
        </div>
      </div>
    </Root>
  );
}

export default SelectDropDownPop;
