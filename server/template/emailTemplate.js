const confirmationEmailTemplate = ({ path, firstName }) => {
    return `
        <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%">
            <table>
                <tr>
                    <h1 style="width: 100%;">Dear ${firstName},</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo maxime doloribus sapiente laboriosam dolore, dolorum nihil est provident illum quo molestiae ratione quidem amet similique, harum in maiores? Adipisci, corrupti ex minus aspernatur nihil ducimus! Architecto, reprehenderit. Illo iste, corporis non ea nobis error sapiente dolores deserunt illum necessitatibus. Sint!</p>
                    <a style="padding: 0.5rem 1rem; background: #6d63ff; color: #fff; font-weight: bold; text-decoration: none;" href=${path}>Confirm Email</a>
                </tr>
            </table>
        </div>
    `
}

module.exports = {
    confirmationEmailTemplate
}