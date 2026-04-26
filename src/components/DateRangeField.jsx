import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import {
  bookingRangeFromSearchParams,
  bookingRangeToSearchParams,
  createDefaultBookingRange,
} from "../lib/booking";

export function formatDate(value) {
  return value ? format(value, "MMM dd") : "";
}

export function formatRangeLabel(range) {
  if (!range?.from) {
    return "Choose Date";
  }

  if (!range.to) {
    return formatDate(range.from);
  }

  return `${formatDate(range.from)} - ${formatDate(range.to)}`;
}

function normalizeRange(range) {
  return {
    from: range?.from ?? undefined,
    to: range?.to ?? undefined,
  };
}

export const createDefaultRange = createDefaultBookingRange;
export const rangeToSearchParams = bookingRangeToSearchParams;
export const rangeFromSearchParams = bookingRangeFromSearchParams;

function DateRangeField({
  value,
  onChange,
  label = "Choose Date",
  triggerClassName = "react-date-trigger form-control no-border no-bg bg-focus-color text-white fs-20 text-right text-center",
}) {
  const initialRange = useMemo(() => createDefaultBookingRange(), []);
  const [open, setOpen] = useState(false);
  const [internalRange, setInternalRange] = useState(initialRange);
  const [draftRange, setDraftRange] = useState(initialRange);
  const appliedRange = value ?? internalRange;

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setDraftRange(appliedRange);
    }
  };

  const handleApply = () => {
    if (!draftRange?.from || !draftRange?.to) {
      return;
    }

    const nextRange = normalizeRange(draftRange);

    if (onChange) {
      onChange(nextRange);
    } else {
      setInternalRange(nextRange);
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setDraftRange(appliedRange);
    setOpen(false);
  };

  return (
    <div className="text-center">
      <h6 className="id-color mb-1">{label}</h6>

      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <button
            type="button"
            id="date-picker"
            className={triggerClassName}
            aria-label="Choose date range"
          >
            <span>{formatRangeLabel(appliedRange)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className="react-date-popover" sideOffset={16} align="start">
            <div className="react-date-inputs">
              <div className="react-date-input-box is-active">
                <CalendarIcon size={18} strokeWidth={1.75} />
                <span>{formatDate(draftRange?.from)}</span>
              </div>

              <div className="react-date-input-box">
                <CalendarIcon size={18} strokeWidth={1.75} />
                <span>{formatDate(draftRange?.to)}</span>
              </div>
            </div>

            <DayPicker
              mode="range"
              numberOfMonths={2}
              navLayout="around"
              selected={draftRange}
              onSelect={(nextRange) => {
                if (!nextRange) {
                  return;
                }

                setDraftRange(normalizeRange(nextRange));
              }}
              defaultMonth={draftRange?.from}
              weekStartsOn={1}
              showWeekNumber
              showOutsideDays
              className="react-booking-calendar"
            />

            <div className="react-date-actions">
              <button
                type="button"
                className="btn-main react-date-apply"
                onClick={handleApply}
                disabled={!draftRange?.from || !draftRange?.to}
              >
                Apply
              </button>
              <button
                type="button"
                className="react-date-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default DateRangeField;
