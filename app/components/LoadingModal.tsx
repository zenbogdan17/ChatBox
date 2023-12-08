'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PulseLoader } from 'react-spinners';

interface LoadingModalProps {
  isShow?: boolean;
}

const LoadingModal = ({ isShow = true }: LoadingModalProps) => {
  return (
    <Transition.Root show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="easy-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="easy-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel>
              <PulseLoader size={20} color="#5d2dab" />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
