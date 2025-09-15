export default function DemoNotice() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex gap-3">
        <svg className="h-6 w-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="text-amber-800 font-medium">Demo Mode</h3>
          <p className="text-amber-700 text-sm mt-1">
            This is a demo interface. All data is stored locally in your browser and will be reset when you clear your browser data.{' '}
            <a href="/tech" className="text-amber-800 underline hover:text-amber-900">Learn how the real system works →</a>
          </p>
        </div>
      </div>
    </div>
  );
}