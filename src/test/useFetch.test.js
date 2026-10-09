import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useFetch from "../hooks/useFetch";

describe("useFetch", () => {
  it("exposes the resolved data and clears loading", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ products: [1, 2] });

    const { result } = renderHook(() => useFetch(fetchFn, []));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ products: [1, 2] });
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("stores the error message when the request rejects", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("Request failed"));

    const { result } = renderHook(() => useFetch(fetchFn, []));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Request failed");
    expect(result.current.data).toBeNull();
  });

  it("runs the request again when retry is called", async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({ page: 1 })
      .mockResolvedValueOnce({ page: 2 });

    const { result } = renderHook(() => useFetch(fetchFn, []));

    await waitFor(() => expect(result.current.data).toEqual({ page: 1 }));

    act(() => {
      result.current.retry();
    });

    await waitFor(() => expect(result.current.data).toEqual({ page: 2 }));
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it("refetches when a dependency changes", async () => {
    const fetchFn = vi.fn().mockResolvedValueOnce("first").mockResolvedValueOnce("second");

    const { result, rerender } = renderHook(
      ({ id }) => useFetch(() => fetchFn(id), [id]),
      { initialProps: { id: 1 } }
    );

    await waitFor(() => expect(result.current.data).toBe("first"));

    rerender({ id: 2 });
    await waitFor(() => expect(result.current.data).toBe("second"));
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});
