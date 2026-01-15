<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
// @ts-ignore
import { store } from "host_app/store";

const count = ref(0);
const isChanged = ref(false);
let cleanup: () => void;

onMounted(() => {
  count.value = store.get().count;
  cleanup = store.subscribe((state: { count: number }) => {
    count.value = state.count;
  });
});

watch(count, () => {
    isChanged.value = true;
    setTimeout(() => isChanged.value = false, 300);
});

onUnmounted(() => {
  if (cleanup) cleanup();
});

const increment = () => {
  store.set({ count: count.value + 1 });
};

const decrement = () => {
  store.set({ count: count.value - 1 });
};
</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-header">
      <div class="title-group">
        <div class="icon-box">📊</div>
        <h2>Analytics Dashboard <span class="brand-tag">(Vue Remote)</span></h2>
      </div>
      <div class="status-badge">
        <span class="status-dot"></span>
        Live Sync
      </div>
    </div>
    
    <div class="kpi-grid">
      <!-- Total Users -->
      <div class="kpi-card">
        <div class="card-header">
            <span class="card-label">TOTAL USERS</span>
            <span class="trend up">↗ 12%</span>
        </div>
        <div class="card-value">1,234</div>
        <div class="card-footer">
            <div class="progress-bar">
                <div class="fill" style="width: 75%"></div>
            </div>
            <span class="sub-text">Target: 1,500</span>
        </div>
      </div>
      
      <!-- Active Intensity -->
      <div class="kpi-card">
        <div class="card-header">
            <span class="card-label">ACTIVE SESSIONS</span>
            <span class="trend neutral">− 0%</span>
        </div>
        <div class="card-value">56</div>
        <div class="card-footer">
             <div class="progress-bar">
                <div class="fill warning" style="width: 45%"></div>
            </div>
            <span class="sub-text">Avg: 50-60</span>
        </div>
      </div>
      
      <!-- Global Counter (Interactive) -->
      <div class="kpi-card interactive" :class="{ 'pulse-active': isChanged }">
        <div class="card-header">
            <span class="card-label">전역 카운트</span>
            <span class="live-indicator">●</span>
        </div>
        <div class="counter-display">
            {{ count }}
        </div>
        <div class="control-panel">
          <button @click="decrement" class="ctrl-btn dec" aria-label="Decrease">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none"><rect width="12" height="2" rx="1" fill="currentColor"/></svg>
          </button>
          <div class="divider"></div>
          <button @click="increment" class="ctrl-btn inc" aria-label="Increase">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0V12M0 6H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.dashboard-wrapper {
  padding: 20px;
  background: #ffffff; /* Clean white background */
  border-radius: 16px;
  height: 100%;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #e2e8f0;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-box {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4f46e5 0%, #818cf8 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
}

h2 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: #1e293b;
}

.brand-tag {
  color: #94a3b8;
  font-weight: 500;
  font-size: 14px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 20px;
  color: #15803d;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* KPI Card Base */
.kpi-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  border-color: #cbd5e1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.5px;
}

.trend {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}
.trend.up { background: #ecfdf5; color: #059669; }
.trend.neutral { background: #f1f5f9; color: #64748b; }

.card-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.card-footer {
  margin-top: auto;
}

.progress-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 6px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: #4f46e5;
  border-radius: 2px;
}
.fill.warning { background: #f59e0b; }

.sub-text {
  font-size: 11px;
  color: #94a3b8;
}

/* Interactive Card Special */
.kpi-card.interactive {
  background: #eff6ff;
  border-color: #bfdbfe;
  position: relative;
  overflow: hidden;
}

.kpi-card.interactive.pulse-active {
  animation: flash 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-color: #3b82f6;
  background: #dbeafe;
}

@keyframes flash {
  0% { transform: scale(1); }
  50% { transform: scale(1); }
  100% { transform: scale(1); }
}

.live-indicator {
  color: #3b82f6;
  font-size: 10px;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}

.counter-display {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 800;
  color: #1e3a8a;
  text-align: center;
  padding: 10px 0;
}

.control-panel {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #dbeafe;
}

.ctrl-btn {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px;
  cursor: pointer;
  color: #3b82f6;
  border-radius: 6px;
  transition: background 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ctrl-btn:hover { background: #eff6ff; }
.ctrl-btn:active { background: #dbeafe; }

.divider {
  width: 1px;
  background: #e2e8f0;
  margin: 4px 0;
}

/* Chart Section */
.chart-container {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  margin: 0;
}

.legend-item {
  font-size: 11px;
  color: #64748b;
  margin-left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.dot.primary { background: #4f46e5; }
.dot.secondary { background: #cbd5e1; }

.chart-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 10px;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  width: 100%;
}

.bar-wrapper {
  flex: 1;
  width: 12px;
  display: flex;
  flex-direction: column-reverse; /* Bottom up */
  background: rgba(226, 232, 240, 0.3);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.bar {
  width: 100%;
  border-radius: 6px;
  transition: height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bar.primary { 
  background: linear-gradient(to bottom, #818cf8, #4f46e5); 
  position: absolute;
  bottom: 0;
  z-index: 2;
}
.bar.secondary { 
  background: #cbd5e1; 
  position: absolute;
  bottom: 0;
  z-index: 1;
  opacity: 0.5;
}

.bar-column:hover .bar.primary {
  filter: brightness(1.1);
  width: 14px;
  margin-left: -1px;
}

.col-label {
  font-size: 10px;
  font-weight: 600;
  color: #94a3b8;
}
</style>
