'use client'

import { AssignmentTurnedIn, Loading, ToastError, ToastInfo, ToastSuccess, ToastWarning } from './icons/index';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport, ToastActionElement } from '../ui/toast';
import React from 'react';

export interface ToastProps {
    id: string;
    text: string;
    variant: "success" | "error" | "copy" | "loading" | "warning" | "info";
}

const toastColors = {
    success: {
        bg: "#06CB6C1A",
        text: "#06CB6C",
    },
    error: {
        bg: "#FF00001A",
        text: "#FF0000",
    },
    copy: {
        bg: "#3280F41A",
        text: "#3280F4",
    },
    loading: {
        bg: "#3280F41A",
        text: "#3280F4",
    },
    warning: {
        bg: "#FEA8011A",
        text: "#FEA801",
    },
    info: {
        bg: "#0000001A",
        text: "#000000",
    },
}

function getIconAndColor(variant: ToastProps["variant"]) {
    switch (variant) {
        case "success":
            return {
                icon: <ToastSuccess width={24} height={24} />,
                title: 'Success'
            };
        case 'error':
            return {
                icon: <ToastError width={24} height={24} />,
                title: 'Error'
            };
        case 'copy':
            return {
                icon: <AssignmentTurnedIn width={24} height={24} fill='#3280F4' />,
                title: 'Copied to Clipboard'
            };
        case 'loading':
            return {
                icon: <Loading width={24} height={24} className='reverse-spin' />,
                title: 'Loading'
            };
        case 'warning':
            return {
                icon: <ToastWarning width={24} height={24} />,
                title: 'Warning'
            };
        case 'info':
            return {
                icon: <ToastInfo width={24} height={24} />,
                title: 'Info'
            };
        default:
            return {
                icon: <ToastSuccess width={24} height={24} />,
                title: 'Success'
            };
    }
};

export const Toaster: React.FC = () => {
    const { toasts } = useToast();

    return (
        <ToastProvider  >
            {toasts.map((toast) => {
                const { id, text, variant, open, onOpenChange } = toast;
                const result = getIconAndColor(variant);

                return (
                    <Toast className='bg-white z-[10000] w-fit ml-auto ' key={id} open={open} onOpenChange={onOpenChange} variant={variant}>
                        <div
                            style={{
                                background: `${toastColors[variant].bg}`,
                                color: `${toastColors[variant].text}`,
                            }}
                            className="flex flex-row gap-[15px] !p-[15px] ml-auto items-center border-none"
                        >
                            <div className="flex aspect-square items-center justify-center">
                                {result.icon}
                            </div>
                            <div className="flex flex-col gap-[5px] font-poppins">
                                <ToastTitle>
                                    {result.title}
                                </ToastTitle>
                                <ToastDescription>
                                    {text}
                                </ToastDescription>
                            </div>
                        </div>
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider >
    );
};

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
    id?: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

type ActionType = typeof actionTypes

type Action =
    | {
        type: ActionType["ADD_TOAST"]
        toast: ToasterToast
    }
    | {
        type: ActionType["UPDATE_TOAST"]
        toast: Partial<ToasterToast>
    }
    | {
        type: ActionType["DISMISS_TOAST"]
        toastId?: ToasterToast["id"]
    }
    | {
        type: ActionType["REMOVE_TOAST"]
        toastId?: ToasterToast["id"]
    }

interface State {
    toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId,
        })
    }, TOAST_REMOVE_DELAY)

    toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            }

        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t
                ),
            }

        case "DISMISS_TOAST": {
            const { toastId } = action

            if (toastId) {
                addToRemoveQueue(toastId)
            } else {
                state.toasts.forEach((toast) => {
                    addToRemoveQueue(toast.id)
                })
            }

            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === toastId || toastId === undefined
                        ? {
                            ...t,
                            open: false,
                        }
                        : t
                ),
            }
        }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                }
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            }
    }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
    memoryState = reducer(memoryState, action)
    listeners.forEach((listener) => {
        listener(memoryState)
    })
}


function _createToast({ ...props }: ToasterToast) {
    const id = props.id || genId();

    if (memoryState.toasts.some(toast => toast.id === id)) {
        return {
            id: id,
            dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
            update: (updateProps: ToasterToast) =>
                dispatch({
                    type: "UPDATE_TOAST",
                    toast: { ...updateProps, id },
                }),
        };
    }

    const update = (updateProps: ToasterToast) =>
        dispatch({
            type: "UPDATE_TOAST",
            toast: { ...updateProps, id },
        });
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open) => {
                if (!open) dismiss();
            },
        },
    });

    return {
        id: id,
        dismiss,
        update,
    };
}

function useToast() {
    const [state, setState] = React.useState<State>(memoryState)

    React.useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        ...state,
        showToast,
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    }
}

function showToast(
    variant: ToastProps["variant"],
    text: string,
    id?: string,
    autoClose?: number | false
) {
    const toastId = id || variant + text;

    const { dismiss, update } = _createToast({
        id: toastId,
        text,
        variant,
        open: true,
    });

    if (autoClose !== false) {
        const timeout = setTimeout(() => {
            dismiss();
        }, autoClose !== undefined ? autoClose : 30000);

        toastTimeouts.set(toastId, timeout);
    }

    return {
        id: toastId,
        dismiss,
        update,
    };
}

function updateToast(
    variant: ToastProps["variant"],
    text: string,
    id?: string,
    autoClose?: number | false
) {
    const toastId = id || variant + text;

    dispatch({
        type: 'UPDATE_TOAST',
        toast: {
            id: toastId,
            text: text,
            variant: variant,
            open: true,
        },
    });

    if (autoClose !== false) {
        if (toastTimeouts.has(toastId)) {
            clearTimeout(toastTimeouts.get(toastId));
        }
        const timeout = setTimeout(() => {
            dispatch({ type: 'DISMISS_TOAST', toastId });
        }, autoClose !== undefined ? autoClose : 3000);

        toastTimeouts.set(toastId, timeout);
    }
}

function dismissToast(toastId?: string) {
    dispatch({ type: 'DISMISS_TOAST', toastId });
}

function showPromiseToast<TData = unknown>(
    promise: Promise<TData>,
    {
        success,
        pending,
        error,
    }: { success?: string; pending: string; error?: string },
    id?: string,
) {
    const internalId = id || (success + pending + error);
    showToast("loading", pending, internalId, false);

    return promise
        .then((response) => {
            if (success) {
                updateToast('success', success, internalId, 3000);
            } else {
                dismissToast(internalId);
            }
            return response;
        })
        .catch((err) => {
            updateToast("error", error || err.message, internalId, 3000);
            throw err;
        });
}


export { useToast, showToast, showPromiseToast, updateToast, dismissToast }
