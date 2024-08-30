use anchor_lang::prelude::*;

declare_id!("FiDdfRv2y6JVYGZVUw7QqxXhE2zUg5yFXvskwvwTHCdK");

#[program]
pub mod calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
