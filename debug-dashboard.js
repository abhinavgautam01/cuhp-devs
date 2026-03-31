// Quick test to check dashboard API
const fetch = require('node-fetch');

async function testDashboardAPI() {
    try {
        console.log('Testing dashboard API...');
        const response = await fetch('http://localhost:3001/user/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add auth headers if needed
            }
        });
        
        console.log('Status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Dashboard data:', JSON.stringify(data, null, 2));
            console.log('Feed items count:', data?.feedItems?.length || 0);
        } else {
            console.log('Error response:', await response.text());
        }
    } catch (error) {
        console.error('API test failed:', error.message);
    }
}

testDashboardAPI();